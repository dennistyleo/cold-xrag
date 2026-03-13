/**
 * XRAG V37: The Hyperlinked Sovereign Substrate
 * FIX: Enforced Click-to-Center Linkage & Formula Rendering
 */

function initV37Ledger() {
    var tree = document.getElementById('watchdog-axiom');
    if (!tree) return;

    tree.style.fontFamily = "Calibri, sans-serif";
    tree.innerHTML = '<div style="font-size:0.55rem; opacity:0.3; margin-bottom:10px;">V37 LINKED SUBSTRATE</div>';

    var manifest = [
        { id: "1", domain: "1. LOGIC & MATH", range: [1, 60] },
        { id: "2", domain: "2. PHYSICAL SCIENCES", range: [61, 150] },
        { id: "3", domain: "3. CHEMICAL SCIENCES", range: [151, 210] },
        { id: "4", domain: "4. LIFE SCIENCES", range: [211, 270] },
        { id: "5", domain: "5. EARTH & SPACE", range: [271, 320] },
        { id: "6", domain: "6. APPLIED & SOCIAL", range: [321, 378] }
    ];

    manifest.forEach(function(m) {
        var dDiv = document.createElement('div');
        dDiv.style.cssText = "font-size: 1.1rem; font-weight: bold; color: #777; padding: 10px 0 5px 0;";
        dDiv.innerText = m.domain;
        tree.appendChild(dDiv);

        var leafContainer = document.createElement('div');
        leafContainer.style.marginLeft = "15px";

        for (var i = m.range[0]; i <= m.range[1]; i++) {
            var id = "XRAG-" + String(i).padStart(4, "0");
            var data = (typeof axioms !== "undefined") ? axioms[id] : null;
            
            var leaf = document.createElement('div');
            var isAnchor = (data && data.type === "anchor");
            leaf.style.cssText = "font-size: 0.68rem; line-height: 1.0; padding: 1px 0; cursor: pointer;";
            leaf.style.color = isAnchor ? "#eee" : "#333";
            leaf.innerHTML = "<strong>" + id + ":</strong> " + (data ? data.name : "Axiom " + id);
            
            // THE CRITICAL LINK: Event listener to update the center GMN window
            (function(axiomData) {
                leaf.onclick = function() {
                    // Update GMN Center Display
                    var gmnDisplay = document.querySelector('.gmn-formula-overlay'); // Adjust selector if needed
                    if (!gmnDisplay) gmnDisplay = document.getElementById('formula-overlay');
                    
                    if (gmnDisplay && axiomData) {
                        // Inset the LaTeX formula
                        gmnDisplay.innerHTML = "$$" + axiomData.equation + "$$";
                        
                        // Force MathJax to re-render the new formula
                        if (window.MathJax) {
                            MathJax.typesetPromise([gmnDisplay]).then(() => {
                                console.log("Axiom Linked: " + axiomData.name);
                            });
                        }
                    }
                };
            })(data);

            leafContainer.appendChild(leaf);
        }
        tree.appendChild(leafContainer);
    });
}

// Re-initialize on every load
window.onload = initV37Ledger;
