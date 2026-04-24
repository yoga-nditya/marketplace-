package service

import (
	"errors"
	"marketplace-backend/src/model"
	"marketplace-backend/src/repository"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

func Register(req model.RegisterRequest) (model.RegisterResponse, error) {
	if req.Name == "" {
		return model.RegisterResponse{}, errors.New("nama tidak boleh kosong")
	}
	if req.Email == "" {
		return model.RegisterResponse{}, errors.New("email tidak boleh kosong")
	}
	if req.Password != req.ConfirmPassword {
		return model.RegisterResponse{}, errors.New("password tidak cocok")
	}

	_, err := repository.GetUserByEmail(req.Email)
	if err == nil {
		return model.RegisterResponse{}, errors.New("email sudah ada")
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return model.RegisterResponse{}, err
	}

	user := model.User{
		ID:       uuid.New().String(),
		Name:     req.Name,
		Email:    req.Email,
		Password: string(hashedPassword),
		Roles:    "user",
	}

	if err := repository.CreateUser(&user); err != nil {
		return model.RegisterResponse{}, err
	}

	return model.RegisterResponse{
		ID:        user.ID,
		Name:      user.Name,
		Email:     user.Email,
		Roles:     user.Roles,
		CreatedAt: user.CreatedAt,
		UpdatedAt: user.UpdatedAt,
	}, nil
}

func Login(req model.LoginRequest) (model.LoginResponse, error) {
	user, err := repository.GetUserByEmail(req.Email)
	if err != nil {
		return model.LoginResponse{}, errors.New("user tidak ditemukan")
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
		return model.LoginResponse{}, errors.New("password salah")
	}

	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		secret = "secret"
	}

	expiresIn := int64(86400)
	now := time.Now()
	expiresAt := now.Add(time.Duration(expiresIn) * time.Second)

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub":   user.ID,
		"exp":   expiresAt.Unix(),
		"roles": user.Roles,
	})

	tokenString, err := token.SignedString([]byte(secret))
	if err != nil {
		return model.LoginResponse{}, err
	}

	userToken := model.UserToken{
		UserID:      user.ID,
		AccessToken: tokenString,
		TokenType:   "Bearer",
		ExpiresIn:   int(expiresIn),
		IssuedAt:    now,
		ExpiresAt:   expiresAt,
		CreatedAt:   now,
		UpdatedAt:   now,
	}

	if err := repository.CreateUserToken(&userToken); err != nil {
		return model.LoginResponse{}, err
	}

	return model.LoginResponse{
		AccessToken: tokenString,
		TokenType:   "Bearer",
		ExpiresIn:   expiresIn,
		Issued:      now.Format(time.RFC3339),
		Expires:     expiresAt.Format(time.RFC3339),
		Name:        user.Name,
	}, nil
}
