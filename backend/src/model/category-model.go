package model

type Category struct {
	ID   string `json:"id"    gorm:"primaryKey;column:id"`
	Name string `json:"name"  gorm:"column:name"`
	Slug string `json:"slug"  gorm:"column:slug"`
}

func (Category) TableName() string {
	return "categories"
}
