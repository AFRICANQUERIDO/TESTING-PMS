CREATE PROCEDURE registerUser
   ( @user_id NVARCHAR(100),
    @name NVARCHAR(200),
    @email NVARCHAR(255),
    @phone_number NVARCHAR(100),
    @password NVARCHAR(200)
    )
AS
BEGIN
    INSERT INTO Users (user_id, name, email, phone_number,password)
    VALUES (@user_id, @name, @email, @phone_number,@password)
END

