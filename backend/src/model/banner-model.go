package model

type Banner struct {
	ID       string `json:"id"         gorm:"primaryKey;column:id"`
	Title    string `json:"title"      gorm:"column:title"`
	Image    string `json:"image"      gorm:"column:image"`
	IsActive bool   `json:"is_active"   gorm:"column:is_active"`
}

func (Banner) TableName() string {
	return "banners"
}
