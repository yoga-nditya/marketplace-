package repository

import (
	"marketplace-backend/config"
	"marketplace-backend/src/model"
)

func GetAllProducts() ([]model.Product, error) {
	var products []model.Product
	err := config.DB.Table("products").
		Select("products.*, categories.name as categories_id").
		Joins("left join categories on categories.id = products.categories_id").
		Scan(&products).Error
	return products, err
}
