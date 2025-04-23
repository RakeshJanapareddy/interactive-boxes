document.addEventListener('DOMContentLoaded', function() {
    // Get all boxes and radio inputs
    const boxes = document.querySelectorAll('.box');
    const radioInputs = document.querySelectorAll('input[type="radio"]');
    const totalElement = document.querySelector('.total');
    const addToCartButton = document.querySelector('.add-to-cart');
    
    // Initialize - set the selected box based on checked radio
    updateSelectedBox();
    
    // Add click event to boxes
    boxes.forEach(box => {
        box.addEventListener('click', function(event) {
            // Don't trigger if clicking on a select element
            if (event.target.tagName === 'SELECT' || 
                event.target.tagName === 'OPTION') {
                return;
            }
            
            // Find the radio input in this box and check it
            const radio = this.querySelector('input[type="radio"]');
            radio.checked = true;
            
            // Update selected box
            updateSelectedBox();
            
            // Update total price
            updateTotalPrice();
        });
    });
    
    // Add change event to radio inputs
    radioInputs.forEach(radio => {
        radio.addEventListener('change', function() {
            // Update selected box
            updateSelectedBox();
            
            // Update total price
            updateTotalPrice();
        });
    });
    
    // Add change event to select elements
    const selectElements = document.querySelectorAll('select');
    selectElements.forEach(select => {
        select.addEventListener('change', function() {
            // Remove error class if value is selected
            if (this.value) {
                this.classList.remove('error');
            }
        });
    });
    
    // Add click event to "Add to Cart" button
    addToCartButton.addEventListener('click', function() {
        // Get the selected option
        let selectedBox = null;
        radioInputs.forEach(radio => {
            if (radio.checked) {
                selectedBox = radio.closest('.box');
            }
        });
        
        if (selectedBox) {
            const units = selectedBox.dataset.units;
            const price = selectedBox.dataset.price;
            
            // Validate that all selects in the selected box have values
            const selects = selectedBox.querySelectorAll('select');
            let allValid = true;
            
            selects.forEach(select => {
                if (!select.value) {
                    select.classList.add('error');
                    allValid = false;
                } else {
                    select.classList.remove('error');
                }
            });
            
            if (allValid) {
                // Collect selected options for confirmation message
                let selectedOptions = [];
                const optionRows = selectedBox.querySelectorAll('.option-row');
                
                optionRows.forEach((row, index) => {
                    const sizeSelect = row.querySelector('.size-select');
                    const colorSelect = row.querySelector('.color-select');
                    
                    if (sizeSelect && colorSelect) {
                        selectedOptions.push(`Item #${index + 1}: ${sizeSelect.value}, ${colorSelect.value}`);
                    }
                });
                
                // Show confirmation message
                alert(`Added to Cart:
${selectedOptions.join('\n')}

Total: $${price} USD`);
                
                // Reset selects to default state
                selects.forEach(select => {
                    select.selectedIndex = 0;
                });
            } else {
                alert('Please select size and color for all items.');
            }
        }
    });
    
    // Function to update selected box
    function updateSelectedBox() {
        // Remove selected class from all boxes
        boxes.forEach(box => {
            box.classList.remove('selected');
        });
        
        // Add selected class to the box with checked radio
        radioInputs.forEach(radio => {
            if (radio.checked) {
                const parentBox = radio.closest('.box');
                parentBox.classList.add('selected');
            }
        });
    }
    
    // Function to update total price
    function updateTotalPrice() {
        let selectedPrice = "0.00";
        
        // Find the selected box and get its price
        radioInputs.forEach(radio => {
            if (radio.checked) {
                const parentBox = radio.closest('.box');
                selectedPrice = parentBox.dataset.price;
            }
        });
        
        // Update the total element
        totalElement.textContent = `Total : $${selectedPrice} USD`;
    }
    
    // Initialize the total price
    updateTotalPrice();
});