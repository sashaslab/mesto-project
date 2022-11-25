const buttonOpenEditProfilePopup = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup__edit');
const buttonsClosePopup = document.querySelectorAll('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const nameInput = document.querySelector('#name');
const aboutInput = document.querySelector('#about');
const formElementEdit = document.querySelector('.form-edit');
const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup__add');
const formElementAdd = document.querySelector('.form-add');
const titleImageInput = document.querySelector('#title-image');
const linkImageInput = document.querySelector('#link-image');
const elements = document.querySelector('.elements');
const popupImage = document.querySelector('.popup__image')
const popupBigImage = document.querySelector('.popup__bigimage')
const popupImageName = document.querySelector('.popup__image-name')
const cardTemplate = document.querySelector('#card-template').content;

function openPopup(popup) {
  popup.classList.add('popup_opened');
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

buttonOpenEditProfilePopup.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  openPopup(popupEdit);
});

buttonOpenAddCardPopup.addEventListener('click', function () {
  openPopup(popupAdd);
});

buttonsClosePopup.forEach(function (button) {
  const popup = button.closest('.popup');
  button.addEventListener('click', function () {
    closePopup(popup);
  });
});

function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopup(popupEdit);
};

formElementEdit.addEventListener('submit', submitEditProfileForm);


function createCard(imageValue, titleValue) {
  const card = cardTemplate.querySelector('.elements__element').cloneNode(true);
  const cardImage = card.querySelector('.elements__image');
  cardImage.src = imageValue;
  cardImage.alt = titleValue;
  card.querySelector('.elements__title').textContent = titleValue;

  card.querySelector('.elements__button-removed').addEventListener('click', function (evt) {
    evt.target.closest('.elements__element').remove();
  });
  cardImage.addEventListener('click', function (evt) {
    buttonOpenImagePopup(evt.target.src, titleValue)
  })
  card.querySelector('.elements__button-like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__button-like_active');
  });

  return card;
}
function buttonOpenImagePopup(imageValue, titleValue) {
  openPopup(popupImage);
  popupBigImage.src = imageValue;
  popupBigImage.alt = titleValue;
  popupImageName.textContent = titleValue;
}

function addFormSubmit(evt) {
  evt.preventDefault();
  elements.prepend(createCard(linkImageInput.value, titleImageInput.value));
  linkImageInput.value = '';
  titleImageInput.value = '';
  closePopup(popupAdd);
}

formElementAdd.addEventListener('submit', addFormSubmit);

function renderInitialCards(card) {
  for (let i = 0; i < card.length; i++) {
    elements.prepend(createCard(card[i].link, card[i].name));
  };
};
renderInitialCards(initialCards);
