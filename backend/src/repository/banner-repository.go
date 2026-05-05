package repository

import (
	"marketplace-backend/config"
	"marketplace-backend/src/model"
)

func GetAllBanners() ([]model.Banner, error) {
	var banners []model.Banner
	err := config.DB.Order("created_at ASC").Find(&banners).Error
	return banners, err
}

func GetAllBannersAdmin() ([]model.BannerAdmin, error) {
	var banners []model.BannerAdmin
	err := config.DB.Unscoped().Order("created_at ASC").Find(&banners).Error
	return banners, err
}

func GetBannerByID(id string) (model.BannerAdmin, error) {
	var banner model.BannerAdmin
	err := config.DB.Unscoped().Where("id = ?", id).First(&banner).Error
	return banner, err
}

func CreateBanner(banner model.BannerAdmin) error {
	return config.DB.Create(&banner).Error
}

func UpdateBanner(banner model.BannerAdmin) error {
	return config.DB.Save(&banner).Error
}

func DeleteBanner(id string) error {
	return config.DB.Where("id = ?", id).Delete(&model.Banner{}).Error
}
