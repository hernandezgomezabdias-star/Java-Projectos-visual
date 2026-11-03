#include "perro.h"
#define _CRT_SECURE_NO_WARNINGS
#include <iostream>
using namespace std;

perro::perro(){
    cout << "Invocando al constructor de la clase Perro" << endl;
}

void perro::emite_sonido() {
    cout << "El perro hace: Guau Guau" << endl;
}