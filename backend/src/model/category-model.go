package model

type Category struct {
	ID    string `json:"id"    gorm:"primaryKey;column:id"`
	Name  string `json:"name"  gorm:"column:name"`
	Image string `json:"image" gorm:"column:image"`
	Slug  string `json:"slug"  gorm:"column:slug"`
}

func (Category) TableName() string {
	return "categories"
}
