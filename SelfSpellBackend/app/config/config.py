class BaseConfig:
    """Base configuration."""
    DEBUG = False
    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'your-secret-key'

class DevelopmentConfig(BaseConfig):
    """Development configuration."""
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:123@localhost/SelfSpell'


class TestingConfig(BaseConfig):
    """Testing configuration."""
    DEBUG = True
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'postgresql://yourPostgresUsername:yourPassword@localhost:5432/databaseName'

class ProductionConfig(BaseConfig):
    """Production configuration."""
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = 'postgresql://yourPostgresUsername:yourPassword@localhost:5432/databaseName'


def get_config_by_name(config_name):
    """ Get config by name """
    if config_name == 'development':
        return DevelopmentConfig()
    elif config_name == 'production':
        return ProductionConfig()
    elif config_name == 'testing':
        return TestingConfig()
    else:
        return DevelopmentConfig()
