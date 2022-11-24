const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const profileEditButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup__edit');
const popupCloseButton = document.querySelectorAll('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const nameInput = document.querySelector('#name');
const aboutInput = document.querySelector('#about');
const formElementEdit = document.querySelector('.form-edit');
const profileAddButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup__add');
const formElementAdd = document.querySelector('.form-add');
const titleImageInput = document.querySelector('#title-image');
const linkImageInput = document.querySelector('#link-image');
const elements = document.querySelector('.elements');
const popupImage = document.querySelector('.popup__image')
const popupBigImage = document.querySelector('.popup__bigimage')
const popupImageName = document.querySelector('.popup__image-name')

function openPopup(popup) {
  popup.classList.add('popup_opened');
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

profileEditButton.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  openPopup(popupEdit);
});

profileAddButton.addEventListener('click', function () {
  openPopup(popupAdd);
});

popupCloseButton.forEach(function (item) {
  const popup = item.closest('.popup');
  item.addEventListener('click', function () {
    closePopup(popup);
  });
});

function EditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopup(popupEdit);
};

formElementEdit.addEventListener('submit', EditFormSubmit);

function addCard(imageValue, titleValue) {
  const cardTemplate = document.querySelector('#card-template').content;
  const elementsElement = cardTemplate.querySelector('.elements__element').cloneNode(true);
  elements.prepend(elementsElement);
  elementsElement.querySelector('.elements__image').src = imageValue;
  elementsElement.querySelector('.elements__image').alt = titleValue;
  elementsElement.querySelector('.elements__title').textContent = titleValue;
  elementsElement.querySelector('.elements__button-removed').addEventListener('click', function (evt) {
    evt.target.closest('.elements__element').remove();
  });
  elementsElement.querySelector('.elements__image').addEventListener('click', function (evt) {
    const elementsElement2 = evt.target.closest('.elements__element');
    const elementsImage = elementsElement2.querySelector('.elements__image');
    const elementsBody = elementsElement2.querySelector('.elements__body');
    const elementsTitle = elementsBody.querySelector('.elements__title')
    popupBigImage.src = elementsImage.src;
    popupBigImage.alt = elementsTitle.textContent;
    popupImageName.textContent = elementsTitle.textContent;
    openPopup(popupImage);
  })
  elementsElement.querySelector('.elements__button-like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__button-like_active');
  });
  return elementsElement;
}

function addFormSubmit(evt) {
  evt.preventDefault();
  addCard(linkImageInput.value, titleImageInput.value);
  closePopup(popupAdd);
}

formElementAdd.addEventListener('submit', addFormSubmit);

function generateCard(cardObj) {
  for (let i = 0; i < cardObj.length; i++) {
    elements.prepend(addCard(cardObj[i].link, cardObj[i].name));
  };
};
generateCard(initialCards);
