//  function toggleItem(element) {
//   element.classList.toggle('checked');
//   updateProgress();
//   if (element.classList.contains('checked')) {
//     createConfetti(element);
//   }
// }

// function updateProgress() {
//   const items = document.querySelectorAll('.item');
//   const checkedItems = document.querySelectorAll('.checked');
//   const progress = (checkedItems.length / items.length) * 100;
//   document.getElementById('progress').style.width = progress + '%';
// }

// function createConfetti(element) {
//   const colors = ['#f00', '#0f0', '#00f', '#ff0', '#0ff', '#f0f'];
//   const rect = element.getBoundingClientRect();
  
//   for (let i = 0; i < 10; i++) {
//     const confetti = document.createElement('div');
//     confetti.className = 'confetti';
//     confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
//     confetti.style.left = (rect.left + Math.random() * rect.width) + 'px';
//     confetti.style.top = rect.top + 'px';
//     document.body.appendChild(confetti);
    
//     setTimeout(() => {
//       confetti.remove();
//     }, 1000);
//   }
// }
 

 
let currentTotal = 0;

function updateCharacter(total) {
  const face = document.querySelector('.character-face');
  const eyes = document.querySelectorAll('.eye');
  const mouth = document.querySelector('.mouth');

  // Reset animations
  face.style.animation = 'none';
  face.offsetHeight; // Trigger reflow

  if (total > 100) {
    // Worried expression
    eyes.forEach(eye => {
      eye.style.height = '12px';
      eye.style.borderRadius = '40%';
    });
    mouth.style.width = '25px';
    mouth.style.height = '15px';
    mouth.style.borderBottom = '3px solid #333';
    face.style.backgroundColor = '#FFB6C1';
  } else if (total > 50) {
    // Concerned expression
    eyes.forEach(eye => {
      eye.style.height = '8px';
      eye.style.borderRadius = '50%';
    });
    mouth.style.width = '20px';
    mouth.style.height = '8px';
    mouth.style.borderBottom = '3px solid #333';
    face.style.backgroundColor = '#FFD93D';
  } else {
    // Happy expression
    eyes.forEach(eye => {
      eye.style.height = '8px';
      eye.style.borderRadius = '50%';
    });
    mouth.style.width = '20px';
    mouth.style.height = '10px';
    mouth.style.borderBottom = '3px solid #333';
    face.style.backgroundColor = '#FFD93D';
  }

  face.style.animation = 'surprised 0.5s ease';
}

function updateTotal(price, isAdding) {
  const totalElement = document.querySelector('.total-amount');
  const oldTotal = currentTotal;
  
  if (isAdding) {
    currentTotal += price;
  } else {
    currentTotal -= price;
  }
  
  totalElement.textContent = `₦${new Intl.NumberFormat('en-NG', { style: 'decimal' }).format(currentTotal)}`;
  totalElement.classList.add('pulse');
  
  // Update character reaction
  updateCharacter(currentTotal);
  
  setTimeout(() => {
    totalElement.classList.remove('pulse');
  }, 500);
}

function toggleItem(element) {
  const isChecked = element.classList.contains('checked');
  const price = parseFloat(element.dataset.price);
  
  element.classList.toggle('checked');
  updateTotal(price, !isChecked);
}
 