package admin_service

import (
	"errors"
	"marketplace-backend/src/model"
	"marketplace-backend/src/repository"
	"strings"

	"github.com/google/uuid"
)

func GetAllCategoriesAdmin() ([]model.CategoryAdmin, error) {
	return repository.GetAllCategories()
}

func GetCategoryByID(id string) (model.CategoryAdmin, error) {
	return repository.GetCategoryByID(id)
}

func CreateCategory(name, image, slug string) (model.CategoryAdmin, error) {
	if name == "" {
		return model.CategoryAdmin{}, errors.New("nama kategori tidak boleh kosong")
	}

	if slug == "" {
		slug = strings.ToLower(strings.ReplaceAll(name, " ", "-"))
	}

	category := model.CategoryAdmin{
		Category: model.Category{
			ID:    uuid.New().String(),
			Name:  name,
			Image: image,
			Slug:  slug,
		},
	}

	if err := repository.CreateCategory(category); err != nil {
		return model.CategoryAdmin{}, err
	}

	return category, nil
}

func UpdateCategory(id, name, image, slug string) (model.CategoryAdmin, error) {
	category, err := repository.GetCategoryByID(id)
	if err != nil {
		return model.CategoryAdmin{}, errors.New("kategori tidak ditemukan")
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

	if err := repository.UpdateCategory(category); err != nil {
		return model.CategoryAdmin{}, err
	}

	return category, nil
}

func DeleteCategory(id string) error {
	_, err := repository.GetCategoryByID(id)
	if err != nil {
		return errors.New("kategori tidak ditemukan")
	}

	return repository.DeleteCategory(id)
}
