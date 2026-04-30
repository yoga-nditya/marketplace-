package admin_service

import (
	"errors"
	"marketplace-backend/src/model"
	"marketplace-backend/src/repository"
	"strings"

	"github.com/google/uuid"
)

func GetAllProductsAdmin() ([]model.Product, error) {
	return repository.GetAllProducts()
}

func GetProductByID(id string) (model.Product, error) {
	return repository.GetProductByID(id)
}

func CreateProduct(p model.Product) (model.Product, error) {
	if p.Name == "" {
		return model.Product{}, errors.New("nama produk tidak boleh kosong")
	}

	if p.Slug == "" {
		p.Slug = strings.ToLower(strings.ReplaceAll(p.Name, " ", "-"))
	}

	if p.ID == "" {
		p.ID = uuid.New().String()
	}

	if err := repository.CreateProduct(p); err != nil {
		return model.Product{}, err
	}

	return p, nil
}

func UpdateProduct(p model.Product) (model.Product, error) {
	existing, err := repository.GetProductByID(p.ID)
	if err != nil {
		return model.Product{}, errors.New("produk tidak ditemukan")
	}

	// Update fields if provided
	if p.Name != "" {
		existing.Name = p.Name
		if p.Slug == "" {
			existing.Slug = strings.ToLower(strings.ReplaceAll(p.Name, " ", "-"))
		}
	}
	if p.CategoriesID != "" {
		existing.CategoriesID = p.CategoriesID
	}
	if p.Image != "" {
		existing.Image = p.Image
	}
	if p.Price != 0 {
		existing.Price = p.Price
	}
	if p.CapitalPrice != 0 {
		existing.CapitalPrice = p.CapitalPrice
	}
	if p.Description != "" {
		existing.Description = p.Description
	}
	if p.Weight != 0 {
		existing.Weight = p.Weight
	}
	if p.StockAmount != 0 {
		existing.StockAmount = p.StockAmount
	}
	if p.MinimumOrder != 0 {
		existing.MinimumOrder = p.MinimumOrder
	}
	if p.Slug != "" {
		existing.Slug = p.Slug
	}

	if err := repository.UpdateProduct(existing); err != nil {
		return model.Product{}, err
	}

	return existing, nil
}

func DeleteProduct(id string) error {
	_, err := repository.GetProductByID(id)
	if err != nil {
		return errors.New("produk tidak ditemukan")
	}

	return repository.DeleteProduct(id)
}
