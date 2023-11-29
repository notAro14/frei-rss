export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      feed_items: {
        Row: {
          created_at: string | null
          fk_feed_id: string
          id: string
          is_read: boolean | null
          pub_date: string
          title: string
          url: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          fk_feed_id: string
          id?: string
          is_read?: boolean | null
          pub_date: string
          title: string
          url: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          fk_feed_id?: string
          id?: string
          is_read?: boolean | null
          pub_date?: string
          title?: string
          url?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "feed_items_fk_feed_id_fkey"
            columns: ["fk_feed_id"]
            isOneToOne: false
            referencedRelation: "feeds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feed_items_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      feeds: {
        Row: {
          created_at: string | null
          id: string
          name: string | null
          url: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name?: string | null
          url: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string | null
          url?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "feeds_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
