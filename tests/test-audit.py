"""
Automated Audit Script for Antislop Rules & Delivery Gate Verification
Checks R-01 through R-40 for Satyam Chaturvedi's Daylight Portfolio
"""

import os
import re
import subprocess
import sys

if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

if hasattr(sys.stderr, "reconfigure"):
    try:
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

WORKSPACE = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

def test_no_em_dashes():
    """R-02: Ensure no em dash in HTML, JS, or CSS files."""
    violations = []
    em_dash_char = "—"
    for root, _, files in os.walk(WORKSPACE):
        if ".git" in root or ".agents" in root or "tests" in root:
            continue
        for f in files:
            if f.endswith((".html", ".js", ".css")):
                filepath = os.path.join(root, f)
                with open(filepath, "r", encoding="utf-8") as fp:
                    content = fp.read()
                    if em_dash_char in content or "\u2014" in content:
                        violations.append(f)
    assert not violations, f"R-02 FAIL: Found em dash in files: {violations}"
    print("✓ R-02 PASS: No em dashes found in source code.")

def test_html_semantics_and_landmarks():
    """R-39 & R-40: Semantic HTML landmarks, lang, title, and media attributes."""
    html_path = os.path.join(WORKSPACE, "index.html")
    with open(html_path, "r", encoding="utf-8") as fp:
        html = fp.read()

    assert '<html lang="en"' in html, "R-39 FAIL: Missing html lang attribute."
    assert "<title>" in html and "</title>" in html, "R-39 FAIL: Missing title tag."
    assert '<header' in html and '</header>' in html, "R-39 FAIL: Missing header landmark."
    assert '<nav' in html and '</nav>' in html, "R-39 FAIL: Missing nav landmark."
    assert '<main' in html and '</main>' in html, "R-39 FAIL: Missing main landmark."
    assert '<footer' in html and '</footer>' in html, "R-39 FAIL: Missing footer landmark."
    assert re.search(r'<meta\s+name="viewport"\s+content="[^"]+"', html), "R-39 FAIL: Missing viewport metadata."
    assert re.search(r'<meta\s+name="description"\s+content="[^"]+"', html), "R-39 FAIL: Missing description metadata."
    assert re.search(r'<meta\s+name="author"\s+content="[^"]+"', html), "R-39 FAIL: Missing author metadata."
    
    h1_count = len(re.findall(r'<h1\b', html))
    assert h1_count == 1, f"R-39 FAIL: Expected exactly 1 h1 tag, found {h1_count}."

    img_matches = re.findall(r'<img\b[^>]*>', html)
    for img in img_matches:
        assert 'alt="' in img, f"R-39 FAIL: Image missing alt attribute: {img}"
        assert 'width="' in img and 'height="' in img, f"R-40 FAIL: Image missing dimensions: {img}"

    print("✓ R-39 & R-40 PASS: Document semantics, landmarks, and media dimensions verified.")

def test_navigation_destinations():
    """R-24 & R-26: All anchor navigation targets exist in the document."""
    html_path = os.path.join(WORKSPACE, "index.html")
    with open(html_path, "r", encoding="utf-8") as fp:
        html = fp.read()

    hrefs = re.findall(r'href="#([a-zA-Z0-9_-]+)"', html)
    ids = set(re.findall(r'id="([a-zA-Z0-9_-]+)"', html))

    missing = [target for target in hrefs if target not in ids]
    assert not missing, f"R-24 FAIL: Anchor targets pointing nowhere: {missing}"
    print(f"✓ R-24 & R-26 PASS: All {len(hrefs)} internal anchor targets resolve to real IDs.")

def test_keyboard_interactions():
    """R-26 & R-32: Modal keyboard controls and focus restoration are implemented."""
    app_path = os.path.join(WORKSPACE, "js", "app.js")
    with open(app_path, "r", encoding="utf-8") as fp:
        app = fp.read()

    assert "e.key !== 'Tab'" in app, "R-32 FAIL: Modal does not handle Tab navigation."
    assert "e.shiftKey" in app, "R-32 FAIL: Modal does not handle reverse Tab navigation."
    assert "e.key === 'Escape'" in app, "R-26 FAIL: Modal does not handle Escape."
    assert "this.focusedElementBeforeModal.focus()" in app, "R-32 FAIL: Closing the modal does not restore focus."
    print("✓ R-26 & R-32 PASS: Modal keyboard controls and focus restoration are present.")

def test_clipboard_fallback():
    """Contact email remains available when the clipboard API is unavailable or rejects."""
    app_path = os.path.join(WORKSPACE, "js", "app.js")
    with open(app_path, "r", encoding="utf-8") as fp:
        app = fp.read()

    assert "if (!navigator.clipboard || typeof navigator.clipboard.writeText !== 'function')" in app, \
        "Clipboard FAIL: Missing guard for unavailable clipboard API."
    assert "await navigator.clipboard.writeText(handle)" in app, \
        "Clipboard FAIL: Email is not written using the clipboard API."
    assert "alert('Contact email: ' + handle)" in app, \
        "Clipboard FAIL: Missing fallback for clipboard failures."
    print("✓ Clipboard PASS: Email fallback is available if clipboard access fails.")

def test_color_contrast():
    """R-25: WCAG AA contrast standard check using antislop contrast checker."""
    script = os.path.join(WORKSPACE, ".agents", "skills", "antislop-human", "contrast-check.py")
    pairings = [
        ("Dark Base vs Primary Text", "#0A0A0A", "#F5F5F5", True),
        ("Dark Base vs Secondary Text", "#0A0A0A", "#A3A3A3", True),
        ("Dark Base vs Muted Text", "#0A0A0A", "#8A8A8A", True),
        ("Dark Accent vs Dark Base", "#FFFFFF", "#0A0A0A", True),
        ("Light Base vs Primary Text", "#FAFAFA", "#0A0A0A", True),
        ("Light Base vs Secondary Text", "#FAFAFA", "#404040", True),
        ("Light Base vs Muted Text", "#FAFAFA", "#595959", True),
        ("Light Accent vs Light Base", "#0A0A0A", "#FAFAFA", True)
    ]

    for label, c1, c2, require_normal in pairings:
        res = subprocess.run(["python", script, c1, c2], capture_output=True, text=True)
        out = res.stdout
        if require_normal:
            assert "normal text (4.5:1): PASS" in out, f"R-25 FAIL on {label} ({c1} vs {c2}): {out.strip()}"
        else:
            assert "large text  (3.0:1): PASS" in out, f"R-25 FAIL on {label} ({c1} vs {c2}): {out.strip()}"

    print("✓ R-25 PASS: All color pairings satisfy WCAG AA minimum contrast (>=4.5:1 for normal text).")

def test_no_forbidden_buzzwords():
    """R-16: Check for forbidden AI marketing buzzwords."""
    forbidden = [
        "AI Powered", "AI-Powered", "Revolutionary", "Next Generation", "Next-Gen",
        "Seamless", "Cutting Edge", "Cutting-Edge", "Intelligent", "Ultimate"
    ]
    html_path = os.path.join(WORKSPACE, "index.html")
    with open(html_path, "r", encoding="utf-8") as fp:
        html = fp.read()
        for word in forbidden:
            assert word.lower() not in html.lower(), f"R-16 FAIL: Forbidden buzzword '{word}' found in index.html"

    print("✓ R-16 PASS: Zero forbidden marketing buzzwords in UI copy.")

def test_responsive_mobile_rules():
    """R-03: Responsive mobile rules, tap target minimums, clamp typography."""
    css_path = os.path.join(WORKSPACE, "css", "style.css")
    with open(css_path, "r", encoding="utf-8") as fp:
        css = fp.read()

    assert "clamp(" in css, "R-03 FAIL: Missing fluid clamp typography."
    assert "44px" in css, "R-03 FAIL: Missing 44px minimum tap target rule."
    assert "min-height: 44px" in css, "R-32 FAIL: Links and buttons lack a 44px minimum height."
    assert "prefers-reduced-motion" in css, "R-39 FAIL: Missing prefers-reduced-motion media query."
    assert ":focus-visible" in css, "R-32 FAIL: Missing focus-visible outline rule."
    assert ".site-nav .nav-links { display: flex; flex-wrap: wrap;" in css, "R-03 FAIL: Mobile navigation is hidden or cannot wrap."
    print("✓ R-03, R-32, R-39 PASS: Responsive layout, tap targets, and accessibility rules verified in CSS.")

if __name__ == "__main__":
    print("--- Running Antislop & Delivery Gate Audit Tests ---")
    test_no_em_dashes()
    test_html_semantics_and_landmarks()
    test_navigation_destinations()
    test_keyboard_interactions()
    test_clipboard_fallback()
    test_color_contrast()
    test_no_forbidden_buzzwords()
    test_responsive_mobile_rules()
    print("--- ALL AUDIT TESTS PASSED ---")
