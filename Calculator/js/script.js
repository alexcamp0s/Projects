// toggle functions
document.addEventListener('DOMContentLoaded', () => {
    const toggles = document.querySelectorAll('.toggle-btn input');

    toggles.forEach(toggle => {
        toggle.addEventListener('change', () => {
            if (toggle.checked) {
                // Deselect all other toggles
                toggles.forEach(otherToggle => {
                    if (otherToggle !== toggle) {
                        otherToggle.checked = false;
                    }
                });
            }
        });
    });

    // custom validation msg
    const form = document.getElementById('interestForm');

    form.querySelectorAll('input[required]').forEach(input => {
        input.addEventListener('invalid', () => {
            input.setCustomValidity('This is required.');
        });

        input.addEventListener('input', () => {
            input.setCustomValidity('');
        });
    });
});

// form
document.getElementById('interestForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const principal = parseFloat(document.getElementById('principal').value);
    const rate = parseFloat(document.getElementById('rate').value) / 100;
    const time = parseFloat(document.getElementById('time').value);
    const frequency = parseInt(document.getElementById('frequency').value);
    const monthlyExpense = parseFloat(document.getElementById('expense').value) || 0;

    const subtotal = principal * Math.pow((1 + rate / frequency), frequency * time);
    const totalExpenses = monthlyExpense * 12 * time; // Total de gastos durante el período
    const amount = subtotal - totalExpenses;

    const result = document.getElementById('result');

    // currency
    let currency = "";
    if (document.getElementById('usd').querySelector('input').checked) {
        currency = "USD";
    } else if (document.getElementById('eur').querySelector('input').checked) {
        currency = "EUR";
    } else if (document.getElementById('chf').querySelector('input').checked) {
        currency = "CHF";
    }

    result.textContent = `${amount.toFixed(2)} ${currency}`;
    const resetBtn = document.getElementById('reset-btn');
    resetBtn.style.display = 'inline';
    resetBtn.classList.add('bounce');
});

// reset button
document.getElementById('reset-btn').addEventListener('click', function () {
    document.getElementById('interestForm').reset();
    document.getElementById('result').textContent = '';
    this.style.display = 'none';
});