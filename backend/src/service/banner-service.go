package service

import (
	"marketplace-backend/src/model"
	"marketplace-backend/src/repository"
)

func GetAllBanners() ([]model.Banner, error) {
	return repository.GetAllBanners()
}
