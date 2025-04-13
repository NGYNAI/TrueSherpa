package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/field"
	"entgo.io/contrib/entgql"	
)
	

// User holds the schema definition for the User entity.
type User struct {
	ent.Schema
}

// Fields of the User.
func (User) Fields() []ent.Field {
	return []ent.Field{
		field.String("username"),
		field.String("email").
		Unique(),
	}
}

// Edges of the User.
func (User) Edges() []ent.Edge {
	return nil
}

func (User) Annotations() []schema.Annotation {
    return []schema.Annotation{
        // entgql.QueryField() automatically creates queries like "user" or "users"
        entgql.QueryField(),

        // Or enable auto-create/update mutations:
        // entgql.Mutations(entgql.Create(), entgql.Update()),

        // If you want Relay/Pagination, you can add entgql.RelayConnection()
        // entgql.RelayConnection(),
    }
}