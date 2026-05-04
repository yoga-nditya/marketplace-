package repository

import (
	"marketplace-backend/config"
	"marketplace-backend/src/model"
)

func GetAllCategories() ([]model.CategoryAdmin, error) {
	var categories []model.CategoryAdmin
	err := config.DB.Order("created_at ASC").Find(&categories).Error
	return categories, err
}

func GetCategoryByID(id string) (model.CategoryAdmin, error) {
	var category model.CategoryAdmin
	err := config.DB.First(&category, "id = ?", id).Error
	return category, err
}

func CreateCategory(category model.CategoryAdmin) error {
	return config.DB.Create(&category).Error
}

func UpdateCategory(category model.CategoryAdmin) error {
	return config.DB.Save(&category).Error
}

func DeleteCategory(id string) error {
	return config.DB.Delete(&model.CategoryAdmin{}, "id = ?", id).Error
}
