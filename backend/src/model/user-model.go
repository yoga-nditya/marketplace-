package model

import "time"

type User struct {
	ID        string    `json:"id"         gorm:"primaryKey;column:id"`
	Name      string    `json:"name"       gorm:"column:name"`
	Email     string    `json:"email"      gorm:"column:email;unique"`
	Password  string    `json:"-"          gorm:"column:password"`
	Roles     string    `json:"role"       gorm:"column:roles"`
	CreatedAt time.Time `json:"created_at" gorm:"column:created_at"`
	UpdatedAt time.Time `json:"updated_at" gorm:"column:updated_at"`
}

func (User) TableName() string {
	return "users"
}

type RegisterRequest struct {
	Name            string `json:"name"`
	Email           string `json:"email"`
	Password        string `json:"password"`
	ConfirmPassword string `json:"confirmPassword"`
}

type RegisterResponse struct {
	ID        string    `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Roles     string    `json:"roles"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginResponse struct {
	AccessToken string `json:"access_token"`
	TokenType   string `json:"token_type"`
	ExpiresIn   int64  `json:"expires_in"`
	Issued      string `json:".issued"`
	Expires     string `json:".expires"`
	Name        string `json:"name"`
}

type UserToken struct {
	ID          uint      `gorm:"primaryKey;autoIncrement"`
	UserID      string    `gorm:"type:char(36);column:user_id"`
	AccessToken string    `gorm:"type:text;column:access_token"`
	TokenType   string    `gorm:"type:varchar(50);default:Bearer;column:token_type"`
	ExpiresIn   int       `gorm:"column:expires_in"`
	IssuedAt    time.Time `gorm:"column:issued_at"`
	ExpiresAt   time.Time `gorm:"column:expires_at"`
	CreatedAt   time.Time `gorm:"column:created_at"`
	UpdatedAt   time.Time `gorm:"column:updated_at"`
}

func (UserToken) TableName() string {
	return "user_tokens"
}
