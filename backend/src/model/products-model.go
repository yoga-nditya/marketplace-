package model

type Product struct {
	ID           string `json:"id"             gorm:"primaryKey;column:id"`
	CategoriesID string `json:"categories_id"  gorm:"column:categories_id"`
	Name         string `json:"name"           gorm:"column:name"`
	Image        string `json:"image"          gorm:"column:image"`
	Slug         string `json:"slug"           gorm:"column:slug"`
	Price        int    `json:"price"          gorm:"column:price"`
	StockAmount  int    `json:"stock_amount"   gorm:"column:stock_amount"`
}

func (Product) TableName() string {
	return "products"
}
