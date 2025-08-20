document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.page-section');
    const menuToggle = document.getElementById('menu-toggle');

    // Function to show a specific section and hide others
    const showSection = (targetId) => {
        // Check if the target ID exists in our sections
        const targetSection = document.getElementById(targetId);
        if (!targetSection) {
            console.error(`Section with id '${targetId}' not found.`);
            return;
        }

        // Hide all sections first
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Show the target section
        targetSection.classList.add('active');
    };

    // Add click event listeners to all navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Prevent the default link behavior (page jump)
            e.preventDefault();

            // Get the target section's ID from the data-target attribute
            const targetId = link.getAttribute('data-target');

            // Call the function to show the selected section
            showSection(targetId);

            // Close the burger menu on mobile after a link is clicked
            if (window.innerWidth <= 768) {
                menuToggle.checked = false;
            }
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {
    // A mapping of burger titles to their prices
    const prices = {
        'Cheeseburger Clássico': 21.90,
        'Hambúrguer apimentado de BBQ': 19.90,
        'Hambúrguer Vegano': 25.90
    };

    let cart = {}; // This will hold our cart items and their quantities

    // Find all 'Adicionar ao Carrinho' buttons
    const addToCartButtons = document.querySelectorAll('.bg-red-600.text-white.font-bold.py-2.px-6.rounded-full');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productCard = event.target.closest('.bg-white.rounded-lg.shadow-lg');
            const productTitle = productCard.querySelector('h3').textContent;

            // Add item to cart or increment its quantity
            if (cart[productTitle]) {
                cart[productTitle]++;
            } else {
                cart[productTitle] = 1;
            }

            updatePaymentSection();
        });
    });

    function updatePaymentSection() {
        const orderSummaryList = document.querySelector('.order-summary ul');
        const totalSpan = document.querySelector('.order-summary .text-xl.font-bold span:last-child');
        let total = 0;

        // Clear the current summary to rebuild it
        orderSummaryList.innerHTML = '';

        // Rebuild the summary based on the cart object
        for (const [title, quantity] of Object.entries(cart)) {
            if (quantity > 0) {
                const itemPrice = prices[title];
                const itemTotal = itemPrice * quantity;
                total += itemTotal;

                const listItem = document.createElement('li');
                listItem.className = 'flex justify-between items-center text-lg';
                listItem.innerHTML = `
                    <span>${title} (x${quantity})</span>
                    <span class="font-semibold">R$${itemTotal.toFixed(2)}</span>
                `;
                orderSummaryList.appendChild(listItem);
            }
        }
        
        // Update the total price
        totalSpan.textContent = `R$${total.toFixed(2)}`;
    }
});
