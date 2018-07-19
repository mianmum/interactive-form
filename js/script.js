// function to give focus to first text input
const firstInput = document.querySelector('input[type="text"]');
const giveFocus = firstInput => firstInput.focus();


// JOB ROLE section //
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

// T-SHIRT section //
// only show relevant colours to selected design
const defaultIndex = (menu, index) => menu.selectedIndex = index;
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
        defaultIndex(menu2, 0);
      } else if (menu1.value === "heart js" && menu2.children[i].textContent.includes(heartCheck)) {
          show(menu2.children[i]);
          defaultIndex(menu2, 3);
      } else {
          defaultIndex(menu2, 0);
      };
    };
  };

// ACTIVITIES section //
const activities = document.querySelector('.activities');
// function to disable conflicting checkboxes, and re-enable upon unchecking
const checkDisable = (e, element) => {
  if ( e.target.checked === true ) {
    for ( let i = 1; i <= 7; i++ ) {
      if (
        element.children[i].firstElementChild.checked === false
        && element.children[i].textContent.includes("Tuesday 9am-12pm")
        && e.target.parentNode.textContent.includes("Tuesday 9am-12pm")
      ) {
        element.children[i].firstElementChild.disabled = true;
        } else if (
          element.children[i].firstElementChild.checked === false
          && element.children[i].textContent.includes("Tuesday 1pm-4pm")
          && e.target.parentNode.textContent.includes("Tuesday 1pm-4pm")
        ) {
          element.children[i].firstElementChild.disabled = true;
        };
    };
  } else {
      for ( let i = 1; i <= 7; i++ ) {
        if (
          e.target.parentNode.textContent.includes("Tuesday 9am-12pm")
          && element.children[i].textContent.includes("Tuesday 9am-12pm")
        ) {
            element.children[i].firstElementChild.disabled = false;
          } else if (
            e.target.parentNode.textContent.includes("Tuesday 1pm-4pm")
            && element.children[i].textContent.includes("Tuesday 1pm-4pm")
          ) {
            element.children[i].firstElementChild.disabled = false;
          };
      };
    };
  };

// create a running total cost
let total = 0;
const totalCost = (e) => {
  let text = e.target.parentNode.textContent;
  if (e.target.checked === true) {
    if (text.includes('$100')) {
      total += 100;
    } else if (text.includes('$200')) {
      total += 200;
    };
  } else {
    if (text.includes('$100') && total > 0) {
      total -= 100;
    } else if (text.includes('$200') && total > 100) {
      total -= 200;
    };
  };
  console.log(total);
  return total;
};

// create and append element to display total cost dynamically
const costText = document.createElement('P');
const costDisplay = (parent, child, e) => {
  parent.append(child);
  child.textContent = `Total cost: $${totalCost(e)}`;
};
// add listener to activities section and run appropriate functions
activities.addEventListener('change', e => {
  checkDisable(e, activities);
  costDisplay(activities, costText, e);
});

// PAYMENT section //
// set credit card as default selection
const payMenu = document.querySelector('#payment');
defaultIndex(payMenu, 1);

// functions to perform on page load
document.addEventListener('DOMContentLoaded', () => {
  giveFocus(firstInput);
  hide(jobText);
  jobMenu.onchange = () => showOrHide(jobMenu, jobText, "other");
  designMenu.onchange = () => showColors(designMenu, colorMenu);
  // activities.onchange = () => disableConflicts(activities);
});
