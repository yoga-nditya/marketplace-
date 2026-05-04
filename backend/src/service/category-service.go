package service

import (
	"marketplace-backend/src/model"
	"marketplace-backend/src/repository"
)

func GetAllCategories() ([]model.Category, error) {
	categoriesAdmin, err := repository.GetAllCategories()
	if err != nil {
		return nil, err
	}

	var categories []model.Category
	for _, cat := range categoriesAdmin {
		categories = append(categories, cat.Category)
	}
	return categories, nil
}

func GetCategoryByID(id string) (model.Category, error) {
	categoryAdmin, err := repository.GetCategoryByID(id)
	if err != nil {
		return model.Category{}, err
	}
	return categoryAdmin.Category, nil
}
