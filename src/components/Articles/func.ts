function add(a: number , b: number) {
    return a + b
}

type ObjA = {
    x: number
    y: string
}

function dave(a: ObjA) {
    return a.x
}

function daveTwo({x}: ObjA) {
    return x
}

function example(a: (a: number, b: number) => number) {
    return a(1, 2)
}

example(add)

function exampleTwo(a: () => string) {
    return a()
}

exampleTwo(() => 'dave')
exampleTwo(() => 'ddddd')