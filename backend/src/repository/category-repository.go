package repository

import (
	"marketplace-backend/config"
	"marketplace-backend/src/model"
)

func GetAllCategories() ([]model.Category, error) {
	var categories []model.Category
	err := config.DB.Find(&categories).Error
	return categories, err
}
