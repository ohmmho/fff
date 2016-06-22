<?php
    class Database
    {
        public $_db;

        public function __construct(){

            $db_server=DB_SERVER;
            $db_user=DB_USER;
            $db_pass=DB_PASS;
            $db_name=DB_NAME;
            $this->_db = new mysqli($db_server, $db_user, $db_pass, $db_name);
            $this->_db->query("SET NAMES 'utf8'"); // so important..
            if ( $this->_db->connect_error ) {
                die('Error de Conexión (' . $this->_db->connect_errno . ') '. $this->_db->connect_error);
                printf ("La conexion ha fallado: %s\n",  $this->_db->connect_error );
                exit();
            } else {
                //echo "<br/>Se ha creado el objeto.";
            }
        }

        public function cerrar_conexion()
        {
            if ($this->_db->close()) return true;
            printf ("<br/>La conexión no se ha podido cerrar.< br/>");
            return false;
        }
    }
?>
