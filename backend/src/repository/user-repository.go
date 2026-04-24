package repository

import (
	"marketplace-backend/config"
	"marketplace-backend/src/model"
)

func GetUserByEmail(email string) (model.User, error) {
	var user model.User
	err := config.DB.Where("email = ?", email).First(&user).Error
	return user, err
}

func CreateUser(user *model.User) error {
	return config.DB.Create(user).Error
}

func CreateUserToken(token *model.UserToken) error {
	return config.DB.Create(token).Error
}
