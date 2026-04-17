package model

import "time"

type Banner struct {
	ID        string     `json:"id" gorm:"primaryKey;column:id"`
	Title     string     `json:"title" gorm:"column:title"`
	Image     string     `json:"image" gorm:"column:image"`
	IsActive  bool       `json:"is_active" gorm:"column:is_active"`
	DeletedAt *time.Time `json:"deleted_at" gorm:"column:deleted_at"`
	CreatedAt *time.Time `json:"created_at" gorm:"column:created_at"`
	UpdatedAt *time.Time `json:"updated_at" gorm:"column:updated_at"`
}

func (Banner) TableName() string {
	return "banners"
}
