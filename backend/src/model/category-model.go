package model

import (
	"time"

	"gorm.io/gorm"
)

type Category struct {
	ID        string         `json:"id"         gorm:"primaryKey;column:id;type:char(36)"`
	Name      string         `json:"name"       gorm:"column:name;type:varchar(255)"`
	Image     string         `json:"image"      gorm:"column:image;type:varchar(255)"`
	Slug      string         `json:"slug"       gorm:"column:slug;type:varchar(255)"`
	DeletedAt gorm.DeletedAt `json:"deleted_at" gorm:"column:deleted_at"`
	CreatedAt time.Time      `json:"created_at" gorm:"column:created_at"`
	UpdatedAt time.Time      `json:"updated_at" gorm:"column:updated_at"`
}

func (Category) TableName() string {
	return "categories"
}
