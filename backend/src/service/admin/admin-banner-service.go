package admin_service

import (
	"errors"
	"marketplace-backend/src/model"
	"marketplace-backend/src/repository"

	"github.com/google/uuid"
)

func GetAllBannersAdmin() ([]model.BannerAdmin, error) {
	return repository.GetAllBannersAdmin()
}

func GetBannerByID(id string) (model.BannerAdmin, error) {
	return repository.GetBannerByID(id)
}

func CreateBanner(title, image string, isActive bool) (model.BannerAdmin, error) {
	if title == "" {
		return model.BannerAdmin{}, errors.New("title tidak boleh kosong")
	}

	banner := model.BannerAdmin{
		Banner: model.Banner{
			ID:       uuid.New().String(),
			Title:    title,
			Image:    image,
			IsActive: isActive,
		},
	}

	if err := repository.CreateBanner(banner); err != nil {
		return model.BannerAdmin{}, err
	}

	return banner, nil
}

func UpdateBanner(id, title, image string, isActive *bool) (model.BannerAdmin, error) {
	banner, err := repository.GetBannerByID(id)
	if err != nil {
		return model.BannerAdmin{}, errors.New("banner tidak ditemukan")
	}

	if title != "" {
		banner.Title = title
	}

	if image != "" {
		banner.Image = image
	}

	if isActive != nil {
		banner.IsActive = *isActive
	}

	if err := repository.UpdateBanner(banner); err != nil {
		return model.BannerAdmin{}, err
	}

	return banner, nil
}

func DeleteBanner(id string) error {
	_, err := repository.GetBannerByID(id)
	if err != nil {
		return errors.New("banner tidak ditemukan")
	}

	return repository.DeleteBanner(id)
}
