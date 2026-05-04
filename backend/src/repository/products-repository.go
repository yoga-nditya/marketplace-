package repository

import (
	"marketplace-backend/config"
	"marketplace-backend/src/model"
)

func GetAllProducts() ([]model.ProductAdmin, error) {
	var products []model.ProductAdmin
	err := config.DB.Model(&model.ProductAdmin{}).
		Select("products.*, categories.name as categories_id").
		Joins("left join categories on categories.id = products.categories_id").
		Find(&products).Error
	return products, err
}

func GetProductByID(id string) (model.ProductAdmin, error) {
	var product model.ProductAdmin
	err := config.DB.Where("id = ?", id).First(&product).Error
	return product, err
}

func GetProductDetailByID(id string) (model.ProductAdmin, error) {
	var product model.ProductAdmin
	err := config.DB.Model(&model.ProductAdmin{}).
		Select("products.*, categories.name as categories_id").
		Joins("left join categories on categories.id = products.categories_id").
		Where("products.id = ?", id).
		First(&product).Error
	return product, err
}

func CreateProduct(product model.ProductAdmin) error {
	return config.DB.Create(&product).Error
}

func UpdateProduct(product model.ProductAdmin) error {
	return config.DB.Save(&product).Error
}

func DeleteProduct(id string) error {
	return config.DB.Where("id = ?", id).Delete(&model.ProductAdmin{}).Error
}
