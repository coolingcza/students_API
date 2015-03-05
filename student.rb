class Student
  attr_reader :id, :age, :name, :github
  
  def initialize(options)
    @id = options["id"]
    @name = options["name"]
    @age = options["age"]
    @github = options["github"]
  end
  
  def can_drink?
    age >= 200
  end
  
  def ultra_wise?
    age >= 1000
  end
  
  def github_link
    "http://github.com/#{github}"
  end
  
  # Public: Get a list of all students from the database.
  #
  # Returns an Array of Student objects.
  def self.all
    results = DATABASE.execute("SELECT * FROM students")
    
    results.map { |row_hash| self.new(row_hash) }
  end
  
  # Public: Get a single student from the database.
  #
  # s_id - Integer
  #
  # Returns a Student object.
  def self.find(s_id)
    result = DATABASE.execute("SELECT * FROM students WHERE id = #{s_id}")[0]
    
    self.new(result)
  end
  
  # Returns the object as a Hash.
  def to_hash
    {
      id: id,
      name: name,
      age: age,
      github: github
    }
  end
  
  # Public: insert
   # Inserts the newly created item into the database.
   #
   # Parameters:
   # none
   #
   # Returns: 
   # @id: the primary key for the new row.
   #
   # State changes:
   # New row is created in the database.
    
  def insert
  
    attributes = []
    instance_variables.each do |i|
      attributes << i.to_s.delete("@") if (i != :@id && i != :@table)
    end
  
    values = []
    attributes.each do |a|
      value = self.send(a)
    
      if value.is_a?(Integer)
        values << "#{value}"
      else values << "'#{value}'"
      end
    end
  
    DATABASE.execute("INSERT INTO students (#{attributes.join(", ")}) 
                      VALUES (#{values.join(", ")})")
    @id = DATABASE.last_insert_row_id

  end
  

  # Public: save
   # Updates database with current object values.
   #
   # Parameters:
   # none
   #
   # Returns: 
   # Array containing Hash of data for saved record.
   #
   # State changes:
   # Row values in the database are updated.

  def save
    attributes = []
    
    instance_variables.each do |i|
      attributes << i.to_s.delete("@") if i != :@table
    end
    
    query_components_array = []
    
    attributes.each do |a|
      value = self.send(a)
      
      if value.is_a?(Integer)
        query_components_array << "#{a} = #{value}"
      else
        query_components_array << "#{a} = '#{value}'"
      end
    end
    
    query_string = query_components_array.join(", ")
    # name = 'Sumeet', age = 75, hometown = 'San Diego'

    DATABASE.execute("UPDATE students SET #{query_string} WHERE id = #{id}")
  end
  
  # Public: delete
   # Removes a row from the database.
   #
   # Parameters:
   # none
   #
   # Returns: 
   # empty array?
   #
   # State changes:
   # Row is removed from the database.
  
  def delete
    DATABASE.execute("DELETE from students WHERE id = #{id}")
  end
end