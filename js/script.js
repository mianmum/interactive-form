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
      } else {
          menu2.selectedIndex = 0;
      };
    };
  };

const activities = document.querySelector('.activities');
activities.addEventListener('change', e => {
  if (e.target.checked === true) {
    for (let i = 0; i < activities.children.length; i++) {
      console.log(activities.children[i]);
      if ( i > 0
        && activities.children[i].firstElementChild.checked === false
        && activities.children[i].textContent.includes("Tuesday 9am-12pm")
        && e.target.parentNode.textContent.includes("Tuesday 9am-12pm")
      ) {
        activities.children[i].firstElementChild.disabled = true;
      } else if ( i > 0
        && activities.children[i].firstElementChild.checked === false
        && activities.children[i].textContent.includes("Tuesday 1pm-4pm")
        && e.target.parentNode.textContent.includes("Tuesday 1pm-4pm")
      ) {
        activities.children[i].firstElementChild.disabled = true;
      };
    };
  } else {
    for (let i = 1; i <= 7; i++) {
      activities.children[i].firstElementChild.disabled = false;
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
