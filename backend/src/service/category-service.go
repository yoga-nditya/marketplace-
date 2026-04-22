package service

import (
	"marketplace-backend/src/model"
	"marketplace-backend/src/repository"
)

func GetAllCategories() ([]model.Category, error) {
	return repository.GetAllCategories()
}
