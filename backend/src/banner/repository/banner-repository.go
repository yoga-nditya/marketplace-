package repository

import (
	"marketplace-backend/config"
	"marketplace-backend/src/banner/model"
)

func GetAllBanners() ([]model.Banner, error) {
	var banners []model.Banner
	err := config.DB.Find(&banners).Error
	return banners, err
}
