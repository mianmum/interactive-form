// function to give focus to first text input
const name = document.getElementById('name');
const giveFocus = firstInput => firstInput.focus();
giveFocus(name);


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
// call functions
hide(jobText);
jobMenu.onchange = () => showOrHide(jobMenu, jobText, "other");


// T-SHIRT section //
const defaultIndex = (menu, index) => menu.selectedIndex = index;
const designMenu = document.querySelector('#design');
const colorMenu = document.querySelector('#color');
const colorLabel = document.querySelector('label[for="color"]');
// hide colour menu while design is unselected
hide(colorMenu);
hide(colorLabel);
const hideMenu = (menu1, menu2, label) => {
  if ( menu1.selectedIndex === 1 || menu1.selectedIndex === 2 ) {
    console.log(menu1.selectedIndex);
    show(menu2);
    show(label);
  }  else {
    hide(menu2);
    hide(label);
  };
};
const punCheck = "JS Puns";
const heartCheck = "JS shirt only"
// only show relevant colours to selected design
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
  // call functions
designMenu.onchange = () => {
  hideMenu(designMenu, colorMenu, colorLabel);
  showColors(designMenu, colorMenu);
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
// show or hide payment options depending on menu selection
const paySection = document.querySelectorAll('fieldset')[3];
const payMenu = document.querySelector('#payment');
const showHide = (index1, index2, index3, divs) => {
  show(divs[index1]);
  hide(divs[index2]);
  hide(divs[index3]);
}
const payOptions = e => {
    if ( e.target.value === "credit card" ) {
      showHide(3, 4, 5, paySection.children);
    } else if ( e.target.value === "paypal" ) {
      showHide(4, 3, 5, paySection.children);
    } else if ( e.target.value === "bitcoin" ) {
      showHide(5, 3, 4, paySection.children);
    };
};
payMenu.onchange = e => payOptions(e);
// set default behaviour
const defaultPay = menu => {
  defaultIndex(payMenu, 1);
  showHide(3, 4, 5, paySection.children);
  menu.children[0].disabled = true;
}
defaultPay(payMenu);

// FORM VALIDATION //
const infoField = document.querySelector('fieldset');
const email = document.getElementById('mail');
const menus = document.querySelectorAll('select');
const cardNum = document.getElementById('cc-num');
const zip = document.getElementById('zip');
const cvv = document.getElementById('cvv');
const submit = document.querySelector('button[type="submit"]');
const addWrongClass = element => element.classList.add('wrong');
// create elements to display upon error
const errorText = (message, fieldset) => {
  let node = document.createElement('P');
  node.innerHTML = message;
  node.classList.add('wrong-text');
  fieldset.parentNode.insertBefore(node, fieldset);
};
const nameError = "Please enter your first and last name.";
const emailError = "Please enter a valid email address.";
const cardError = "Please enter a number between 13 and 16 digits";
const zipError = "Please enter a 5-digit number.";
const cvvError = "Please enter a 3-digit number.";
const activityError = "Please select at least one activity.";

// text field validator
const validateField = (field, regex, message) => {
  if ( regex.test(field.value) === false ) {
    addWrongClass(field);
    errorText(message, field);
    return false;
  } else {
    return true;
  }
};
// realtime email validation
const rtText = document.createElement('P');
rtText.innerHTML = emailError;
rtText.classList.add('wrong-text');
const appendError = (field, error) => field.parentNode.insertBefore(error, field);
appendError(email, rtText);
hide(rtText);
const rtValidate = (field, regex) => {
  if ( regex.test(field.value) === false ) {
    if ( field.classList.contains('wrong') === false ) {
      show(rtText);
    };
  } else {
    hide(rtText);
  };
};
// email realtime validator
email.oninput = () => rtValidate(email, /^[^@]+@[^@.]+\.[a-z]{2,}$/i);
// activities validator
const actValidate = fieldset => {
  let check = true;
  for ( let i = 1; i < fieldset.children.length; i++ ) {
    if ( fieldset.children[i].firstElementChild.checked === false ) {
      check = false;
    };
    if ( check === false ) {
      addWrongClass(fieldset);
      errorText(activityError, fieldset);
      return false;
    } else {
      return true;
    };
  };
};
// run validators
const validator = () => {
  let check = 0;
  if ( validateField(name, /\w* \w*/, nameError) === false) {
    check += 1;
  };
  if ( validateField(email, /^[^@]+@[^@.]+\.[a-z]{2,}$/i, emailError) === false ) {
    check += 1;
  };
  if ( actValidate(activities) === false ) {
    check += 1;S
  };
  if ( payMenu.selectedIndex === 1) {
    let cardCheck = 0;
    if ( validateField(cardNum, /\d{13,16}/, cardError) === false ) {
      cardCheck += 1;
    };
    if ( validateField(zip, /\d{5}/, zipError) === false ) {
      cardCheck += 1;
    };
    if ( validateField(cvv, /\d{3}/, cvvError) === false) {
      cardCheck += 1;
    };
    if ( cardCheck > 0 ) {
      check += 1;
    };
  };
  if ( check > 0 ) {
    return false;
  };
};
// event listener for Form
const form = document.querySelector('form');
form.onsubmit = e => {
if ( validator() === false ) {
  e.preventDefault();
  };
};
