package service

import (
	"marketplace-backend/src/model"
	"marketplace-backend/src/repository"
)

func GetAllProducts() ([]model.Product, error) {
	return repository.GetAllProducts()
}
