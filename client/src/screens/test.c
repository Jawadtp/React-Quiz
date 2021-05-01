#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Node
{
    char city[20];
    struct Node* parent;
}typedef node;

node* createNode(char *city)
{
    node *t = (node *)malloc(sizeof(node));
    strcpy(t->city, city);
    t->parent = t;
    return t;
}

node* findSet(node *a)
{
    while(a!=a->parent)
        a=a->parent;
    return a;
}

void doUnion(node *a, node *b)
{
    node *parent1 = findSet(a);
    node *parent2 = findSet(b);
    if(a==b) return;
    if(strcmp(parent1->city, parent2->city) < 0)
        parent2->parent=parent1;
    else
        parent1->parent=parent2;
    return;
}

int main()
{
    int n, l;
    scanf("%d %d", &n, &l);
    node **cities = (node **)malloc(n*sizeof(node*));
    char city1[20], city2[20];
    
    for(int i=0; i<n; i++)
    {
        scanf("%s", city1);
        cities[i] = createNode(city1);
    }
        
    for(int i=0; i<l; i++)
    {
        scanf("%s %s", city1, city2);
        node *t1=NULL, *t2=NULL;
        for(int i=0; i<n; i++)
        {
            if(!strcmp(cities[i]->city, city1))
                t1=cities[i];
            else if(!strcmp(cities[i]->city, city2))
                t2=cities[i];
        }
        doUnion(t1, t2);
    }
    int count =0;
    for(int i=0; i<n; i++)
        if(cities[i]->parent==cities[i] && ++count)
            printf("%s ", cities[i]->city);
    printf("\n%d", count);
    return 0;
}