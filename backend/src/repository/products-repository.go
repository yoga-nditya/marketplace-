package repository

import (
	"marketplace-backend/config"
	"marketplace-backend/src/model"
)

func GetAllProducts() ([]model.Product, error) {
	var products []model.Product
	err := config.DB.Find(&products).Error
	return products, err
}

func GetProductByID(id string) (model.Product, error) {
	var product model.Product
	err := config.DB.Where("id = ?", id).First(&product).Error
	return product, err
}

func CreateProduct(product model.Product) error {
	return config.DB.Create(&product).Error
}

func UpdateProduct(product model.Product) error {
	return config.DB.Save(&product).Error
}

func DeleteProduct(id string) error {
	return config.DB.Where("id = ?", id).Delete(&model.Product{}).Error
}
