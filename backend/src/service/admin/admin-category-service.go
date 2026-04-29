package admin_service

import (
	"errors"
	"marketplace-backend/src/model"
	"marketplace-backend/src/repository"
	"strings"

	"github.com/google/uuid"
)

func GetAllCategoriesAdmin() ([]model.Category, error) {
	return repository.GetAllCategories()
}

func GetCategoryByID(id string) (model.Category, error) {
	return repository.GetCategoryByID(id)
}

func CreateCategory(name, image, slug string) error {
	if name == "" {
		return errors.New("nama kategori tidak boleh kosong")
	}

	if slug == "" {
		slug = strings.ToLower(strings.ReplaceAll(name, " ", "-"))
	}

	category := model.Category{
		ID:    uuid.New().String(),
		Name:  name,
		Image: image,
		Slug:  slug,
	}

	return repository.CreateCategory(category)
}

func UpdateCategory(id, name, image, slug string) error {
	category, err := repository.GetCategoryByID(id)
	if err != nil {
		return errors.New("kategori tidak ditemukan")
	}

	if name != "" {
		category.Name = name
		if slug == "" {
			category.Slug = strings.ToLower(strings.ReplaceAll(name, " ", "-"))
		}
	}

	if image != "" {
		category.Image = image
	}

	if slug != "" {
		category.Slug = slug
	}

	return repository.UpdateCategory(category)
}

func DeleteCategory(id string) error {
	_, err := repository.GetCategoryByID(id)
	if err != nil {
		return errors.New("kategori tidak ditemukan")
	}

	return repository.DeleteCategory(id)
}
