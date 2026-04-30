package model

import (
	"time"

	"gorm.io/gorm"
)

type Product struct {
	ID           string         `json:"id"             gorm:"primaryKey;column:id"`
	CategoriesID string         `json:"categories_id"  gorm:"column:categories_id"`
	Name         string         `json:"name"           gorm:"column:name"`
	Image        string         `json:"image"          gorm:"column:image"`
	Price        uint           `json:"price"          gorm:"column:price;default:0"`
	CapitalPrice uint           `json:"capital_price"  gorm:"column:capital_price;default:0"`
	Description  string         `json:"description"    gorm:"column:description"`
	Weight       uint           `json:"weight"         gorm:"column:weight"`
	StockAmount  uint           `json:"stock_amount"   gorm:"column:stock_amount"`
	MinimumOrder uint           `json:"minimum_order"  gorm:"column:minimum_order"`
	Slug         string         `json:"slug"           gorm:"column:slug"`
	DeletedAt    gorm.DeletedAt `json:"deleted_at"     gorm:"index;column:deleted_at"`
	CreatedAt    time.Time      `json:"created_at"     gorm:"column:created_at"`
	UpdatedAt    time.Time      `json:"updated_at"     gorm:"column:updated_at"`
}

func (Product) TableName() string {
	return "products"
}
