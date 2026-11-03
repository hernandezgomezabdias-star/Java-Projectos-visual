//
// Created by jfaus on 01/10/2026.
//

#ifndef MASCOTAS_ANIMAL_H
#define MASCOTAS_ANIMAL_H
using namespace std;
#include <string>

class Animal {
private:
    string likes;
    int    edad;
    string raza;
    string nombre;
public:
    Animal();  //constructor
    Animal(string raza, string nombre, int edad);
    string getRaza();
    void setRaza(string raza);
    string getNombre();
    void setNombre(string nombre);
    ~Animal(); //destructor
    int  getEdad();
    void setEdad(int edad);
    virtual void emite_sonido() = 0; //  sobrecarga de la funcion emite_sonido() para que sea obligatoria en las clases derivadas
    void info();
};


#endif //MASCOTAS_ANIMAL_H
