// function to give focus to first text input
const firstInput = document.querySelector('input[type="text"]');
const giveFocus = firstInput => firstInput.focus();


// JOB ROLE section
// hide text field until "other" is selected
const jobText = document.getElementById('other-title');
const jobMenu = document.querySelector('#title');
const hide = element => element.classList.add('is-hidden');
const show = element => element.classList.remove('is-hidden');
const showOrHide = (menu, textArea, val) => {
  if (menu.value === val) {
    show(textArea);
  }
  else {
    hide(textArea)
  }
};

// T-SHIRT section
// only show relevant colours to selected design
const designMenu = document.querySelector('#design');
const colorMenu = document.querySelector('#color');
const punCheck = "JS Puns";
const heartCheck = "JS shirt only"
const toggle = element => element.classList.toggle('is-hidden');
const showColors = (menu1, menu2) => {
    for (let i = 0; i < menu2.children.length; i++) {
      hide(menu2.children[i]);
      if (menu1.value === "js puns" && menu2.children[i].textContent.includes(punCheck)) {
        show(menu2.children[i]);
        menu2.selectedIndex = 0;
      } else if (menu1.value === "heart js" && menu2.children[i].textContent.includes(heartCheck)) {
        show(menu2.children[i]);
        menu2.selectedIndex = 3;
      };
    };
  };

// REGISTER section
// disable conflicting event options
// const activities = document.querySelectorAll('fieldset.activities > label > input');
// const disableConflicts = (options) => {
//   for (let i = 0; i < options.length; i++) {
//     options.disabled = false;
//     if (options[i].checked) {
//       switch(i){
//           case 1:
//             options[3].disabled;
//             break;
//           case 2:
//             options[4].disabled;
//             break;
//           case 3:
//             options[1].disabled;
//             break;
//           case 4:
//             options[2].disabled;
//             break;
//       };
//     };
//   };
// };

const activField = document.querySelector('.activities');
activField.addEventListener('change', e => {
  if (e.target.checked === true) {
    for (let i = 1; i <= 7; i++) {
      if (activField.children[i].firstElementChild.checked === false
        && activField.children[i].firstElementChild.textContent.includes("Tuesday 9am-12pm")
        && e.target.textContent.includes("Tuesday 9am-12pm")
      ) {
        activField.children[i].firstElementChild.disabled === true;
      } else if (activField.children[i].firstElementChild.checked === false
        && activField.children[i].firstElementChild.textContent.includes("Tuesday 1pm-4pm")
        && e.target.textContent.includes("Tuesday 1pm-4pm")
      ) {
        activField.children[i].firstElementChild.disabled === true;
      };
    };
  } else {
    for (let i = 1; i <= 7; i++) {
      activField.children[i].firstElementChild.disabled === false;
    };
  };
});






// functions to perform on page load
document.addEventListener('DOMContentLoaded', () => {
  giveFocus(firstInput);
  hide(jobText);
  jobMenu.onchange = () => showOrHide(jobMenu, jobText, "other");
  designMenu.onchange = () => showColors(designMenu, colorMenu);
  // activities.onchange = () => disableConflicts(activities);
});
