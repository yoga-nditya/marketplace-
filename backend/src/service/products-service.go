package service

import (
	"marketplace-backend/src/model"
	"marketplace-backend/src/repository"
)

func GetAllProducts() ([]model.Product, error) {
	productsAdmin, err := repository.GetAllProducts()
	if err != nil {
		return nil, err
	}

	var products []model.Product
	for _, p := range productsAdmin {
		products = append(products, p.Product)
	}
	return products, nil
}

func GetProductByID(id string) (model.Product, error) {
	productAdmin, err := repository.GetProductDetailByID(id)
	if err != nil {
		return model.Product{}, err
	}
	return productAdmin.Product, nil
}
