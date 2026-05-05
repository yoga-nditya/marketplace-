package model

import (
	"time"

	"gorm.io/gorm"
)

type Banner struct {
	ID       string `json:"id"         gorm:"primaryKey;column:id;type:char(36)"`
	Title    string `json:"title"      gorm:"column:title;type:varchar(255)"`
	Image    string `json:"image"      gorm:"column:image;type:varchar(255)"`
	IsActive bool   `json:"is_active"   gorm:"column:is_active;type:tinyint(1)"`
}

type BannerAdmin struct {
	Banner
	DeletedAt gorm.DeletedAt `json:"deleted_at" gorm:"column:deleted_at"`
	CreatedAt time.Time      `json:"created_at" gorm:"column:created_at"`
	UpdatedAt time.Time      `json:"updated_at" gorm:"column:updated_at"`
}

func (Banner) TableName() string {
	return "banners"
}
