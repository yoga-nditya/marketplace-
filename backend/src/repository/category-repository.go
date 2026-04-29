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

func GetCategoryByID(id string) (model.Category, error) {
	var category model.Category
	err := config.DB.First(&category, "id = ?", id).Error
	return category, err
}

func CreateCategory(category model.Category) error {
	return config.DB.Create(&category).Error
}

func UpdateCategory(category model.Category) error {
	return config.DB.Save(&category).Error
}

func DeleteCategory(id string) error {
	return config.DB.Delete(&model.Category{}, "id = ?", id).Error
}
