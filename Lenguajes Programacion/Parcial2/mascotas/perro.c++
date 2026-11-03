#include "perro.h"
#define _CRT_SECURE_NO_WARNINGS
#include <iostream>

class Perro : public Animal {
public:
    Perro(string raza, string nombre, int edad) : Animal(raza, nombre, edad) {
        cout << "Invocando al constructor de la clase Perro" << endl;
    }

    void emite_sonido() override {
        cout << "El perro hace: Guau Guau" << endl;
    }

    ~Perro() {
        cout << "Invocando al destructor de la clase Perro" << endl;
    }
};