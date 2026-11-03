cmake_minimum_required(VERSION 4.3)
project(mascotas)

set(CMAKE_CXX_STANDARD 17)

add_executable(mascotas main.cpp
        Animal.cpp
        Animal.h)
