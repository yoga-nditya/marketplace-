package service

import (
	"marketplace-backend/src/banner/model"
	"marketplace-backend/src/banner/repository"
)

func GetAllBanners() ([]model.Banner, error) {
	return repository.GetAllBanners()
}
